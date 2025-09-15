import { SiApple, SiLinux } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaWindows } from "react-icons/fa";

import styles from "./styles.module.css";

const DownloadFileFeature = ({ content, file, icon }) => {
    const downloadFile = (async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(file.url);

            if (!response.ok) throw new Error("Dosya indirilemedi.");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = file.name;
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (e) { throw new Error(e); }
    });

    return (
        <button
            className={styles.btn}
            onClick={downloadFile}>
            {icon === "windows" ? <FaWindows /> : icon === "macos" ? <SiApple /> : icon === "linux" ? <SiLinux /> : <VscVscode />}
            {content}
        </button>
    );
}
export default DownloadFileFeature;