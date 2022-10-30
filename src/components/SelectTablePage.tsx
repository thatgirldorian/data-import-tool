import React, { useState } from 'react';
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
import appStoreService from '../AppState';
import { DataStore } from '../types'


import {
    PageContainer, 
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
    TopbarBackButton,
    FixedBottomProminentButton
} from "./layout-components";
import '../styles/style.css'


const SelectTablePage = () => {
    const { dataStores } = appStoreService;
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
        
        const primaryTables = !!store && store.tables.map((tbl) => ({
            ...tbl,
            title: tbl.title.split("||")[0]
        }));
        
        const indentedPrimaryTables = !!primaryTables && primaryTables.filter((tbl) => tbl.isIndented);
        
        const isIndented = !!indentedPrimaryTables && indentedPrimaryTables.find(
            (tbl) => tbl.title === selectedTitle
        );
        
        let uniqueTitles = !!primaryTables && primaryTables
            .map((tbl) => tbl.title)
            .filter((t, i, titles) => titles.indexOf(t) === i);
        
        if (table) {
            uniqueTitles = !!store && store.tables
            .map((tbl) => ({ ...tbl, title: tbl.title.split("||") }))
            .filter((tbl) => tbl.title[0] === table)
            .map((tbl) => tbl.title[1]);
        }
        
        const filteredTitles =
            searchText === ""
            ? uniqueTitles
            : !!uniqueTitles && uniqueTitles.filter(
                (title) =>
                    title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                );
        
        const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
            setSelectedTitle(event.target.value);
        };
        
        
        const handleOnNextClick = () => {
            if (!table && selectedTitle && isIndented) {
            setSelectedTitle("");
            setSearchText("");

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
                <Typography variant="body1" className="select-table-text">
                    {source}  has the following tables ready for import. Please select the table you would like to import.
                </Typography>


                <TextField
                    label="Filter"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    />

            <FormControl style={{paddingTop: "10px"}}  component="fieldset">
                <FormLabel style={{paddingTop: "10px", paddingLeft: "-10px"}} component="legend">Tables available for this source</FormLabel>
                <RadioGroup
                    aria-label="table"
                    name="table1"
                    value={selectedTitle}
                    onChange={handleChange}
                >
                    {!!filteredTitles && filteredTitles.map((title, i) => (
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
        
            title=" Next"
            onClick={() => handleOnNextClick()} />

    {/* {selectedTitle ? (
        <FixedBottomProminentButton 
    
        title={`${selectedTitle} has been selected`}
        onClick={() => handleOnNextClick()} />
    ) : (
        <FixedBottomProminentButton 
    
        title=" Next"
        onClick={() => handleOnNextClick()} />
    )}
     */}

    </FixedMiddleBodyWithVerticalScroll> 
    </PageContainer>
)

}


export default SelectTablePage