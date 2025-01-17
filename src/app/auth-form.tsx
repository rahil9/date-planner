'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Heart, CalendarHeart, Clock, UtensilsCrossed, PartyPopper } from 'lucide-react'
import { getNextMonthDate, isWeekend, getAvailableTimeSlots, restaurants } from '../utils/data-utils'

export default function AuthForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [response, setResponse] = useState<string | null>(null)
    const [isNoButtonVisible, setIsNoButtonVisible] = useState(true)
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState<string>()
    const [selectedRestaurant, setSelectedRestaurant] = useState<string>()
    const [isBooked, setIsBooked] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const authEmail = process.env.NEXT_PUBLIC_AUTH_EMAIL;
        const authPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD;
    
        if (email === authEmail && password === authPassword) {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid credentials! Please try again.");
        }
    };

    const handleDateResponse = (answer: string) => {
        setResponse(answer)
    }

    const handleBooking = () => {
        if (selectedDate && selectedTime && selectedRestaurant) {
        setIsBooked(true)
        }
    }

    if (response === 'yes') {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full text-center space-y-6">
            {isBooked ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
                <PartyPopper className="mx-auto h-12 w-12 text-rose-500" />
                <h2 className="text-2xl font-bold text-rose-600">It&apos;s a Date! 💖</h2>
                <div className="space-y-4 text-lg">
                    <p className="flex items-center justify-center gap-2">
                    <CalendarHeart className="text-rose-500" />
                    <span>Date: {selectedDate?.toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                    <Clock className="text-rose-500" />
                    <span>Time: {selectedTime}</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                    <UtensilsCrossed className="text-rose-500" />
                    <span>Venue: {selectedRestaurant}</span>
                    </p>
                </div>
                <p className="text-rose-600 font-medium text-xl mt-6">Can&apos;t wait to see you! 🌹</p>
                </div>
            ) : (
                <>
                <h2 className="text-2xl font-bold text-rose-600">Pick a Date & Time 📅</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col items-center space-y-4">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                        return (
                            date < new Date() || 
                            date > getNextMonthDate() ||
                            !isWeekend(date)
                        )
                        }}
                        className="rounded-md border shadow"
                    />
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                    {selectedDate && (
                        <div className="space-y-2">
                        <label className="text-sm font-medium text-rose-600">Select Time</label>
                        <Select onValueChange={setSelectedTime}>
                            <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Time" />
                            </SelectTrigger>
                            <SelectContent>
                            {getAvailableTimeSlots(selectedDate).map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                {slot}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-rose-600">Select Restaurant</label>
                        <Select onValueChange={setSelectedRestaurant}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Restaurant" />
                        </SelectTrigger>
                        <SelectContent>
                            {restaurants.map((restaurant) => (
                            <SelectItem key={restaurant} value={restaurant}>
                                {restaurant}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    </div>

                    <Button
                        className="w-full bg-rose-500 hover:bg-rose-600 transition-colors mt-4"
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime || !selectedRestaurant}
                    >
                        Book My Date with You 💝
                    </Button>
                    </div>
                </div>
                </>
            )}
            </div>
        </div>
        )
    }

    if (response === 'no') {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-4">
            <h2 className="text-2xl font-bold text-rose-600">😢 Maybe next time... 💔</h2>
            </div>
        </div>
        )
    }

    if (isAuthenticated) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6">
            <h2 className="text-2xl font-bold text-rose-600">Will you go on a date with me? 🌹</h2>
            <div 
                className="flex justify-center gap-4" 
                onMouseLeave={() => setIsNoButtonVisible(true)}
            >
                <Button
                className="bg-rose-500 hover:bg-rose-600 transform hover:scale-110 transition-transform"
                onClick={() => handleDateResponse('yes')}
                >
                Yes! 💖
                </Button>
                {isNoButtonVisible && (
                <Button
                    className="bg-gray-500 hover:bg-gray-600 transition-transform"
                    onClick={() => handleDateResponse('no')}
                    onMouseEnter={() => setIsNoButtonVisible(false)}
                >
                    No 😢
                </Button>
                )}
            </div>
            </div>
        </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-rose-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full space-y-6">
            <div className="text-center">
            <Heart className="mx-auto h-12 w-12 text-rose-500 animate-pulse" />
            <h1 className="mt-4 text-2xl font-bold text-rose-600">Login to My Heart</h1>
            {error && <p className="mt-2 text-rose-500">{error}</p>}
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Input
                type="text"
                placeholder="The email you sent me....✉️"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-rose-200 focus:border-rose-500 focus:ring-rose-500"
                required
                />
            </div>
            <div>
                <Input
                type="password"
                placeholder="PS: it&apos;s your name in small 😜"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-rose-200 focus:border-rose-500 focus:ring-rose-500"
                required
                />
            </div>
            <Button 
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 transition-colors"
            >
                Login to My Heart 💝
            </Button>
            </form>
        </div>
        </div>
    )
}

