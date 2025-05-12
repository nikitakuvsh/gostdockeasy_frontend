import { useState } from 'react';
import './Form.css';

export default function Form() {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [file, setFile] = useState(null);

    const templates = ['Шаблон 1', 'Шаблон 2', 'Шаблон 3'];
    const faculties = ['Факультет графики и искусства книги имени В.А. Фаворского', 'Факультет издательского дела и журналистики', 'Факультет информационных технологий', 'Факультет машиностроения', 'Полиграфический факультет', 'Транспортный факультет', 'Факультет урбанистики и городского хозяйства', 'Факультет химической технологии и биотехнологии', 'Факультет экономики и управления'];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно обработать данные формы
        console.log('Файл:', file);
        console.log('Шаблон:', selectedTemplate);
        console.log('Факультет:', selectedFaculty);
    };

    return (
        <div className='form__container'>
            <div className='form__content'>
                <form onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label htmlFor="file">Загрузить файл:</label>
                        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
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

                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
}
