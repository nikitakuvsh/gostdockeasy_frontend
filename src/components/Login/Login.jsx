import { useState } from 'react';
import './Login.css';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '1234') {
            alert('Успешный вход!');
            // здесь можно перенаправить или сохранить токен
        } else {
            setError('Неверный пароль');
        }
    };

    return (
        <div className='login__container'>
            <form className='login__form' onSubmit={handleSubmit}>
                <h2>Вход в систему</h2>

                <div className="login__group">
                    <label>Логин</label>
                    <input type="text" value="admin" disabled />
                </div>

                <div className="login__group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        required
                    />
                </div>

                {error && <div className="login__error">{error}</div>}

                <button type="submit">Войти</button>
            </form>
        </div>
    );
}
