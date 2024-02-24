export default function getMonthNameUkr(monthNumber:number) {
  const monthsUkr = [
    'Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня',
    'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня',
  ]
  return monthsUkr[monthNumber - 1]
}
