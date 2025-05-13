import { useState } from 'react';
import './Form.css';

export default function Form() {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;

    const templates = ['Шаблон 1', 'Шаблон 2', 'Шаблон 3'];
    const faculties = ['Факультет графики и искусства книги имени В.А. Фаворского', 'Факультет издательского дела и журналистики', 'Факультет информационных технологий', 'Факультет машиностроения', 'Полиграфический факультет', 'Транспортный факультет', 'Факультет урбанистики и городского хозяйства', 'Факультет химической технологии и биотехнологии', 'Факультет экономики и управления'];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !selectedTemplate || !selectedFaculty) {
            alert("Заполните все поля и выберите файл.");
            return;
        }

        setIsSubmitting(true);
        setProgress(0);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('template', selectedTemplate);
        formData.append('faculty', selectedFaculty);
        setProgress(40);

        try {
            const response = await fetch(`${BACKEND_API}/submit`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных');
                setProgress(0);
                setIsSubmitting(false);
            }

            setIsSubmitting(false);
            setProgress(75);
            setIsDownloading(true);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'coursework.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setProgress(100);
        } catch (error) {
            console.error('Ошибка:', error);
            setProgress(0);
            setIsSubmitting(false);
        } finally {
            setIsDownloading(false);
        }
    };

    const getButtonText = () => {
        if (isSubmitting) {
            return 'Отправляем...';
        }
        if (isDownloading) {
            return 'Скачиваем...';
        }
        return 'Отправить';
    };

    return (
        <div className='form__container'>
            <div className='form__content'>
                <form onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="file">Загрузить файл:</label>
                        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <div className="form__group">
                        <label htmlFor="template">Выбрать шаблон:</label>
                        <select id="template" value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                            <option value="">-- Выберите шаблон --</option>
                            {templates.map((template, index) => (
                                <option key={index} value={template}>{template}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form__group">
                        <label htmlFor="faculty">Выбрать факультет:</label>
                        <select id="faculty" value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
                            <option value="">-- Выберите факультет --</option>
                            {faculties.map((faculty, index) => (
                                <option key={index} value={faculty}>{faculty}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" disabled={isSubmitting || isDownloading}
                            style={{background: progress != 0 ? `linear-gradient(to right, #4f46e5 ${progress}%, #ddd ${progress}%)` : '',}}>
                        {getButtonText()}
                    </button>
                </form>
            </div>
        </div>
    );
}
