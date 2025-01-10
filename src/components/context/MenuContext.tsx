"use client"
import {useState, useContext,createContext, useCallback } from "react";


type MenuContextType = {
    openMenu :boolean;
    closeMenu :()=>void;
    toggleMenu:()=>void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC <{children : React.ReactNode}> =({children},) => {

    const [openMenu,setOpenMenu] = useState(false);

    const toggleMenu = useCallback(()=> {
        setOpenMenu((preState)=> !preState);
    },[]);

    const closeMenu = ()=>{
        setOpenMenu(false)
    }
return(
    <MenuContext.Provider value={{toggleMenu , openMenu, closeMenu}}>
        {children}
    </MenuContext.Provider>
)
} 

export const useMenu =() => {
    const useMenuContext  = useContext(MenuContext);

    if (!useMenuContext) {
        throw new Error("useMenu must be used within a MenuProvider");
    }

    return useMenuContext

};
