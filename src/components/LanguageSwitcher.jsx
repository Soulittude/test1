import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(next);
  };

  return (
    <Button
      size="small"
      style={{ position: "fixed", top: 16, right: 16 }}
      onClick={toggleLang}
    >
      {i18n.language === "en" ? "TR" : "EN"}
    </Button>
  );
}
