import React from "react";
import { Paginator } from "primereact/paginator";

function AutoPaginador({first, rows, autosFiltrados, onPageChange}){
    return(
        <div className="flex justify-center mt-10">
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={autosFiltrados.length}
                    onPageChange={onPageChange}
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    className="bg-white/80 backdrop-blur-md rounded-md shadow-md p-2"
                  />
       </div>
    )
}

export default AutoPaginador;