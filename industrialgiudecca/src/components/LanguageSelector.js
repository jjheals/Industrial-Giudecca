import { useTranslation } from 'react-i18next';


const languages = [
    { code: "en", lang: "English" },
    { code: "it", lang: "Italian" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        console.log('Changing language to:', lng);
        i18n.changeLanguage(lng);
    };

    return (
        <div className="lanButton">
            {languages.map((lng) => (
                <button
                    className={lng.code === i18n.language ? "selected" : ""}
                    key={lng.code}
                    onClick={() => changeLanguage(lng.code)}
                >
                    {lng.lang}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
