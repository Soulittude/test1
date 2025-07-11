import { useSelector } from "react-redux";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { Card, Descriptions } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export default function InvoiceDetailPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const reduxInvoice = useSelector((state) =>
    state.invoice.items.find((inv) => inv.id === id)
  );
  const invoice = reduxInvoice || location.state?.invoice;

  if (!invoice) {
    //If no invoice found(maybe reload), redirect back
    return <Navigate to="/invoices" replace />;
  }

  const amount =
    invoice.paymentDetails?.totalAmount ?? invoice.taxInclusiveAmount ?? "N/A";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 24,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          width: "100%",
          margin: "0 auto", // ← horizontal centering
        }}
      >
        <Card
          title={`${t("invoice.detailTitle")}: ${invoice.invoiceNumber}`}
          style={{ maxWidth: 800, width: "100%" }}
        >
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label={t("invoice.no")}>
              {invoice.invoiceNumber}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.date")}>
              {dayjs(invoice.issueDate).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.amount")}>
              {amount} {invoice.currency}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.status")}>
              {invoice.status}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.customer")}>
              {invoice.customerName}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.supplier")}>
              {invoice.supplierName}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.dueDate")}>
              {invoice.dueDate
                ? dayjs(invoice.dueDate).format("DD/MM/YYYY")
                : "-"}
            </Descriptions.Item>
            <Descriptions.Item label={t("invoice.errorMessage")}>
              {invoice.errorMessage || "-"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
}
