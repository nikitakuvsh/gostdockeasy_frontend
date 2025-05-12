import './Header.css';

export default function Header(){
    return (
        <header className='header'>
            <div className='header__container'>
                <div className='header__content'>
                    <a className='header__link' href='/'>Отредактировать документ</a>
                    <a className='header__link' href='/stats'>Статистика</a>
                    <a className='header__link' href='https://gostdoc.computernetthings.ru/'>Расширенная версия</a>
                    <a className='header__link' href='https://gostdock-landing.netlify.app/'>Что это такое?</a>
                </div> 
            </div>
        </header>
    );
}