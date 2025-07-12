// import { useState } from 'react';

const CustomDatePicker = ({ date, onChange }) => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

    const handleChange = (type, value) => {
        const newDate = new Date(date);
        if (type === 'day') newDate.setDate(parseInt(value));
        if (type === 'month') newDate.setMonth(parseInt(value));
        if (type === 'year') newDate.setFullYear(parseInt(value));
        onChange(newDate);
    };

    return (
        <div className="custom-date-picker">
            <select
                value={date.getDate()}
                onChange={(e) => handleChange('day', e.target.value)}
            >
                {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
            </select>

            <select
                value={date.getMonth()}
                onChange={(e) => handleChange('month', e.target.value)}
            >
                {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                ))}
            </select>

            <select
                value={date.getFullYear()}
                onChange={(e) => handleChange('year', e.target.value)}
            >
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export default CustomDatePicker;
