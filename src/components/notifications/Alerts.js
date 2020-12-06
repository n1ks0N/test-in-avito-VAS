import React, { useEffect, useMemo } from 'react'
import AlertUsual from './types/AlertUsual'

const Alerts = ({ setAlert, alert, alert: { text } }) => {
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
            <AlertUsual
                text={text}
                style={style}
            />
        </>
    )
}

export default Alerts