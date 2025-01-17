export function getNextMonthDate() {
    const today = new Date()
    const nextMonth = new Date(today)
    nextMonth.setMonth(today.getMonth() + 1)
    return nextMonth
}

export function isWeekend(date: Date) {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
}

export function getAvailableTimeSlots(date: Date) {
    const day = date.getDay()
    const timeSlots = []
    
    if (day === 6) { 
        // Saturday
        // After 4 PM
        timeSlots.push(
            "4:00 PM - 6:00 PM",
            "6:00 PM - 8:00 PM",
            "8:00 PM - 10:00 PM"
        );
    } else if (day === 0) { 
        // Sunday
        // All day
        timeSlots.push(
            "10:00 AM - 12:00 PM",
            "12:00 PM - 2:00 PM",
            "2:00 PM - 4:00 PM",
            "4:00 PM - 6:00 PM",
            "6:00 PM - 8:00 PM",
            "8:00 PM - 10:00 PM"
        );
    }    
    return timeSlots
}

export const restaurants = [
    "Mi Casa Su Casa 🌯",
    "Third Wave Coffee ☕",
    "Facing East 🍜",
    "Poetry by Love and Cheesecake 🍰",
    "Silkroute 🍽️",
]
