'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = () => {
        router.back()
    }

    const onClick = (e: React.MouseEvent) => {
        if (e.target === overlay.current || e.target === wrapper.current) {
            if (onDismiss) onDismiss()
        }
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') onDismiss()
    }

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') onDismiss()
        })
        return () => document.removeEventListener('keydown', (e) => { if (e.key === 'Escape') onDismiss() })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            ref={overlay}
            className={styles.overlay}
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className={styles.wrapper}
            >
                <div className={styles.content}>
                    <button className={styles.closeBtn} onClick={onDismiss}>&times;</button>
                    {children}
                </div>
            </div>
        </div>
    )
}
