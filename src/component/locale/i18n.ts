import {useRouter} from "next/router";

export default function I18n(file: string): any {

    const router = useRouter();
    const {locale} = router;

    const file_extension = file.split('.').pop();
    if (file_extension === 'ts') {
        return {
            language: locale,
            value: require(`/public/locales/${locale}/${file}`).default
        }
    }

    return {
        language: locale,
        value: require(`/public/locales/${locale}/${file}`)
    }
}