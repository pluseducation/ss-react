import { Link } from "react-router-dom"
    // const [valueStartDate, setValueStartDate] = React.useState(null);
    // const [valueEndDate, setValueEndDate] = React.useState(null);
const Missing = () => {
    return (
        
        <article style={{ padding: "100px" }}>
             {/* <Box mb={2} display="flex">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']} >
                        <DatePicker label={translate("gobal_startdate")} format="DD/MM/YYYY" value={valueStartDate} onChange={(newValue) => setValueStartDate(newValue)} sx={{ minWidth: "50px" }}
                        />
                        <DatePicker label={translate("gobal_enddate")} format="DD/MM/YYYY" value={valueEndDate} onChange={(newValue) => setValueEndDate(newValue)} sx={{ minWidth: "50px" }}
                        />
                        <Button type="submit" color="primary" variant="contained" sx={{ maxWidth: "100px" }} >
                            {translate("gobal_search")}
                        </Button>
                    </DemoContainer>
                </LocalizationProvider>
            </Box> */}
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing
