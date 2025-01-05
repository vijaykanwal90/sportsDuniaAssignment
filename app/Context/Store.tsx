'use client'
import {createContext , ReactNode , useContext, Dispatch, SetStateAction , useState} from "react"

type DataType = {
    index:number;
    title:string;
    name:string;
    image:string;
    url:string;
    date:string;

}
interface ContextProps {
    data: DataType[];
    setData: Dispatch<SetStateAction<DataType[]>>;
    originalData: DataType[]; // Store original data
    setOriginalData: Dispatch<SetStateAction<DataType[]>>;
  }
  
  // Create a context with default values
  const ApiDataContext = createContext<ContextProps>({
    data: [], // default empty data
    setData: () => {},
    originalData: [], // original data (no changes)
    setOriginalData: () => {},
     // a no-op function for the default setter
  });

export const ApiDataContextProvider = ({ children }: { children: ReactNode }) =>{
    
    const [data,setData] = useState<[] | DataType[]>([]);
    const [originalData, setOriginalData] = useState<DataType[]>([]);
    return (
        <ApiDataContext.Provider value={{data,setData , originalData,setOriginalData}}>
            {children}
        </ApiDataContext.Provider>
    )
}
export const useApiDataContext = () => useContext(ApiDataContext)