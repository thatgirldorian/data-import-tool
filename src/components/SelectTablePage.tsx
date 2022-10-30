import React, { useContext, useState } from 'react';
import { useNavigate, redirect, useParams } from 'react-router-dom'
import { Typography } from "@material-ui/core";
import {
    FormControl,
    FormLabel,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";
import ApplicationBar from './ApplicationBar'

import { AppContext } from "../AppState";

//export to types.ts later

type DataStore = {
    id: number;
    name: string;
    tables: DataSourceTable[];
};

type DataSourceTable = {
    id: number;
    title: string;
    isIndented: boolean;
};


import {
    PageContainer, 
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton,
    FixedBottomProminentButton
} from "./layout-components";
import '../styles/style.css'


const SelectTablePage = () => {
    const { dataStores } = useContext(AppContext);
    const { source, table } = useParams<{
    source?: string;
    table?: string;}>();
    const navigate = useNavigate()
    const [selectedTitle, setSelectedTitle] = useState("");
    const [searchText, setSearchText] = useState("");


        const store: DataStore | undefined = dataStores.find(
            (_store) => _store.name === source
        );
        
        if (!source || dataStores.length < 1 || !store) {
            redirect("/SelectDataPage")
        }
        
        const primaryTables = store.tables.map((tbl) => ({
            ...tbl,
            title: tbl.title.split("||")[0]
        }));
        
        const indentedPrimaryTables = primaryTables.filter((tbl) => tbl.isIndented);
        
        const isIndented = indentedPrimaryTables.find(
            (tbl) => tbl.title === selectedTitle
        );
        
        let uniqueTitles = primaryTables
            .map((tbl) => tbl.title)
            .filter((t, i, titles) => titles.indexOf(t) === i);
        
        if (table) {
            uniqueTitles = store.tables
            .map((tbl) => ({ ...tbl, title: tbl.title.split("||") }))
            .filter((tbl) => tbl.title[0] === table)
            .map((tbl) => tbl.title[1]);
        }
        
        const filteredTitles =
            searchText === ""
            ? uniqueTitles
            : uniqueTitles.filter(
                (title) =>
                    title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                );
        
        const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setSelectedTitle(event.target.value);
        };
        
        const handleOnNext = (e: any) => {
            if (!table && selectedTitle && isIndented) {
            setSelectedTitle("");
            setSearchText("");
            //fix navigate.push
            navigate(`/SelectTablePage/${source}/${selectedTitle}`);
            } else {
            console.log(`TODO - Go to SelectColumnsPage - of ${selectedTitle}`);
            }
        };
        

    const topbarLeftButton: TopbarBackButton = {
        type: "back",
        onClick: () => navigate("/SelectSourcePage")
};

return (
    <PageContainer>
        <ApplicationBar />
        <FixedTopBar title="Select a table." leftButton={topbarLeftButton} />
        <FixedMiddleBodyWithVerticalScroll>
                <p className="select-table-text">
                    hi
                    {{source}} {{table}} has the following tables ready for import. Please select the table you would like to import.
                </p>


                <TextField
                    label="Filter..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    />

    <FormControl component="fieldset">
        <FormLabel component="legend">Tables</FormLabel>
        <RadioGroup
            aria-label="table"
            name="table1"
            value={selectedTitle}
            onChange={handleChange}
        >
            {filteredTitles.map((title, i) => (
            <FormControlLabel
                key={i}
                value={title}
                control={<Radio />}
                label={title}
            />
            ))}
        </RadioGroup>
    </FormControl> 
    
    <FixedBottomProminentButton 
                // style={{textTransform: "none"}}
                title="Next"
                onClick={() => console.log("TODO - whatever you want to test/debug")} />
    </FixedMiddleBodyWithVerticalScroll> 
    </PageContainer>
)

}


export default SelectTablePage