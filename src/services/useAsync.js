import { useEffect, useState } from 'react'

export function useAsync(fetcher, _deps = [], { throwOnError = true } = {}) {
    const [state, setState] = useState({ data: null, loading: true, error: null })

    useEffect(() => {
        let cancelled = false
        function refresh() {
        Promise.resolve().then(fetcher)
            .then((data) => {
                if (!cancelled) setState({ data, loading: false, error: null })
            })
            .catch((error) => {
                if (!cancelled) setState({ data: null, loading: false, error })
            })
        }
        refresh()
        const interval = setInterval(refresh, 5000)
        window.addEventListener('focus', refresh)

        return () => {
            cancelled = true
            clearInterval(interval)
            window.removeEventListener('focus', refresh)
        }
    }, [fetcher])

    if (state.error && throwOnError) throw state.error
    return state
}
