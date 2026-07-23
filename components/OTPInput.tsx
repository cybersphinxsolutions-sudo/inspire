"use client"

import { useRef, useEffect } from "react"

interface OTPInputProps {
    value: string[]
    onChange: (value: string[]) => void
    disabled?: boolean
}

export default function OTPInput({ value, onChange, disabled = false }: OTPInputProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (index: number, inputValue: string) => {
        // Only allow single digit
        if (inputValue.length > 1) {
            inputValue = inputValue.charAt(inputValue.length - 1)
        }

        // Only allow numbers
        if (inputValue && !/^\d$/.test(inputValue)) {
            return
        }

        const newValue = [...value]
        newValue[index] = inputValue
        onChange(newValue)

        // Auto-focus next input
        if (inputValue && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").slice(0, 6)

        if (!/^\d+$/.test(pastedData)) {
            return
        }

        const newValue = pastedData.split("").concat(Array(6).fill("")).slice(0, 6)
        onChange(newValue)

        // Focus the last filled input or the next empty one
        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    return (
        <div className="flex justify-center gap-2 md:gap-3">
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-[#006795] transition-all ${digit
                            ? "border-[#006795] bg-[#E8F4F8]"
                            : "border-gray-300 bg-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                />
            ))}
        </div>
    )
}
