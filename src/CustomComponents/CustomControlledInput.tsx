import React from 'react'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

interface CustomControlledInput {
    required?: boolean
    fullWidth?: boolean
    name: string
    type?: string
    control: any
    defaultValue?: string
    errors: boolean
    label: string
    disabled?: boolean
}

const CustomControlledInput = (props: CustomControlledInput): JSX.Element => {
    const {
        required = false,
        fullWidth = false,
        name,
        type = 'text',
        control,
        defaultValue = '',
        errors,
        label,
        disabled = false,
    } = props

    return (
        <Controller
            render={({ field: { onChange, value } }) => (
                <TextField
                    required={required}
                    fullWidth={fullWidth}
                    id={name}
                    label={label}
                    name={name}
                    type={type}
                    autoComplete={name}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value)
                    }}
                    error={errors}
                    disabled={disabled}
                />
            )}
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
    )
}

export default CustomControlledInput
