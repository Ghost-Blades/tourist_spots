import { SearchBar } from "@rneui/themed"
import { useState } from "react";


export const Search = () => {

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
        setSearch(search);
    };

    return <>
        <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
            inputStyle={{ color: 'black' }}
            inputContainerStyle={{ backgroundColor: '#EDEDED' }}
            cancelButtonProps={{ color: '#439AA5' }}
            showCancel={false}
            containerStyle={{ height: 60 }}
        />


    </>

}