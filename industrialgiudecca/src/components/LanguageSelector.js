import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", lang: "English" },
    { code: "it", lang: "Italian" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLng = (lng) => {
        i18n.changeLanguage(lng)
            .catch((error) => {
                console.error("Error changing language:", error);
            });
    };

    useEffect(() => {
        // Log the current language whenever it changes
        console.log("Current language:", i18n.language);
    }, [i18n.language]);

    return (
        <div className="btn-container">
            {languages.map((lng) => (
                <button
                    className={lng.code === i18n.language ? "selected" : ""}
                    key={lng.code}
                    onClick={() => changeLng(lng.code)}
                >
                    {lng.lang}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;