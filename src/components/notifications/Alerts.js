import React, { useEffect, useMemo } from 'react'
import AlertExport from './types/AlertExport'

const Alerts = ({ text, alert, setAlert }) => {
    const style = useMemo(() => ({
        display: alert.show ? 'block' : 'none'
    }), [alert])
    useEffect(() => {
        if (alert.show) {
            setTimeout(() => {
                setAlert(prev => {
                    return {
                        ...prev,
                        show: false
                    }
                })
            }, 3000)
        }
    }, [alert, setAlert])
    return (
        <>
            <AlertExport
                text={text}
                style={style}
            />
        </>
    )
}

export default Alerts