"use client"

import { usePathname } from "next/navigation"
import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface I18nContextProps {
    language: string
    lang_suffix: string
    t: (key: string | undefined) => string
    changeLanguage: (value: string) => void
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined)

const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>("en")
    const [translations, setTranslations] = useState<Record<string, string>>({})
    const pathName = usePathname()

    useEffect(() => {
        if (pathName) {
            const savedLang = localStorage.getItem("lang")
            if ((savedLang === "en" || savedLang === "bn") && !pathName?.includes("/super-admin")) {
                setLanguage(savedLang)
            } else {
                setLanguage("en")
            }
            loadTranslations(savedLang || "en")
        }
    }, [pathName])

    const loadTranslations = async (lang: string) => {
        try {
            const res = await fetch(`/data/translations.json`)
            if (!res.ok) throw new Error("Failed to fetch translations.")
            const data = await res.json()
            setTranslations(data[lang] || {})
        } catch (error) {
            console.error("Error loading translations:", error)
        }
    }

    const changeLanguage = (value: string) => {
        if (value === "en" || value === "bn") {
            setLanguage(value)
            localStorage.setItem("lang", value)
            loadTranslations(value)
        }
    }

    let t: any

    if (!pathName?.includes("/super-admin")) {
        t = (key: string | undefined): string => (key ? translations[key] || key : "")
    } else {
        t = (key: string | undefined): string => key || ""
    }

    return (
        <I18nContext.Provider value={{ language, t, changeLanguage, lang_suffix: language === "bn" ? "_bn" : "" }}>
            {children}
        </I18nContext.Provider>
    )
}

export default I18nProvider

export const useI18n = (): I18nContextProps => {
    const context = useContext(I18nContext)
    if (!context) {
        return {
            language: "en",
            lang_suffix: "",
            t: (key: string | undefined) => key || "",
            changeLanguage: () => {},
        }
    }
    return context
}

