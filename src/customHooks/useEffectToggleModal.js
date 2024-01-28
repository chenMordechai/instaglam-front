import {useEffect} from 'react'


export function useEffectToggleModal(onOpenScreen,onCloseScreen,dependencies){
    // const { isScreenOpen, onOpenScreen, onCloseScreen, } = useContext(ScreenOpenContext)

    useEffect(() => {
        if (dependencies.some(d=>d)) {
        // if (openPreferenceModal || openChangeImgModal || openFollowingModal || openShowImgModal) {
            onOpenScreen()
        } else {
            onCloseScreen()
        }

        return () => {
            onCloseScreen()
        }

    }, dependencies)

}