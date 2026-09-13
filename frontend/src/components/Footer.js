import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="site-footer">
            <div className="footer-inner">

                <div className="footer-brand">
                    <div className="footer-logo">🌿 {t('app_title')}</div>
                    <p className="footer-tagline">
                        {t('footer_tagline')}
                    </p>
                </div>

                <div className="footer-links">
                    <div className="footer-col">
                        <h3 className="footer-col-title">{t('footer_col_modules')}</h3>
                        <Link to="/leaf-disease">{t('nav_leaf')}</Link>
                        <Link to="/climate">{t('nav_climate')}</Link>
                        <Link to="/silkworm">{t('nav_silkworm')}</Link>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-col-title">{t('footer_col_project')}</h3>
                        <span>Sri Krishna College of Technology</span>
                        <span>Dept. of Information Technology</span>
                        <span>Project Work Phase-I (23IT701)</span>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-col-title">{t('footer_col_team')}</h3>
                        <span>Nithishkumar D — 727823TUCS212</span>
                        <span>Pavithran K — 727823TUCS219</span>
                        <span>Oviya S — 727823TUCS215</span>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                <span>{t('footer_copyright')}</span>
                <span>{t('footer_tech')}</span>
            </div>
        </footer>
    );
}