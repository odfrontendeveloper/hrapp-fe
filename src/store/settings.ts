import { action, makeObservable, observable } from 'mobx'

interface IOpen {
    isOpen: boolean
    mode: 'profile' | 'password'
}

export class Settings {
    isFetching: boolean = false
    open: IOpen = {
        isOpen: false,
        mode: 'profile',
    }

    constructor() {
        makeObservable(this, {
            isFetching: observable,
            open: observable,
            setFetching: action,
            setOpen: action,
        })
    }

    setOpen(data: IOpen): void {
        this.open = data
    }

    setFetching(fetching: boolean): void {
        this.isFetching = fetching
    }

    reset(): void {
        this.isFetching = false
    }
}
