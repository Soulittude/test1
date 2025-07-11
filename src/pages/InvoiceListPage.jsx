import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../features/invoice/invoiceThunk";
import { Table, Button, DatePicker, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

export default function InvoiceListPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, status, error } = useSelector((state) => state.invoice);

  //Local state for filters & pagination
  const [dates, setDates] = useState([
    dayjs("2025-06-27T00:00:00.000Z"),
    dayjs("2025-07-04T08:31:10.422Z"),
  ]);
  const [page, setPage] = useState(1);

  const loadInvoices = (pageIndex = 1, [start, end] = dates) => {
    const filter = {
      companyId: "01c880ca-46b5-4699-a477-616b84770071",
      documentType: "OUTGOING",
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      page: pageIndex - 1,
      size: 20,
      referenceDocument: "",
      type: null,
      status: null,
      paymentStatus: null,
      isDeleted: false,
    };
    dispatch(fetchInvoices({ filter }))
      .unwrap()
      .catch((msg) => message.error(msg));
  };

  useEffect(() => {
    loadInvoices(page);
  }, []);

  const columns = [
    {
      title: t("invoice.no"),
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: t("invoice.date"),
      dataIndex: "issueDate",
      key: "issueDate",
      render: (date) => dayjs(date).format("DD / MM / YYYY"),
    },
    {
      title: t("invoice.amount"),
      key: "amount",
      render: (_, record) => {
        // prefer the paymentDetails.totalAmount, fallback to taxInclusiveAmount
        const amt =
          record.paymentDetails?.totalAmount ?? record.taxInclusiveAmount;
        // show the currency, e.g. "132.84 EUR"
        return `${amt} ${record.currency || ""}`;
      },
    },
    {
      title: t("invoice.status"),
      dataIndex: "status",
      key: "status",
    },
    {
      title: t("invoice.detail"),
      key: "detail",
      render: (_, record) => (
        <Button onClick={() => navigate(`/invoices/${record.id}`)}>
          {t("invoice.detail")}
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 24,
        minHeight: "100vh",
        justifyContent: "flex-start",
        paddingTop: 40,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto 16px", // ← horizontal centering + bottom margin
        }}
      >
        <RangePicker
          value={dates}
          style={{ width: "100%" }}
          onChange={(vals) => {
            if (vals) {
              setDates(vals);
              loadInvoices(1, vals);
              setPage(1);
            }
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto", // ← horizontal centering
        }}
      >
        <Table
          rowKey="id"
          loading={status === "loading"}
          columns={columns}
          dataSource={items}
          pagination={{
            current: page,
            total,
            pageSize: 20,
            onChange: (p) => {
              setPage(p);
              loadInvoices(p);
            },
            showSizeChanger: false,
          }}
        />
      </div>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
    </div>
  );
}
