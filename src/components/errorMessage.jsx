import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const ErrorMessage = ({ valueList }) => {

    return valueList &&
        (
            <Stack sx={{ width: '100%' }} spacing={2}>
                {Object.keys(valueList).map((obj, i) =>
                    <Alert id={i} severity="error">
                        <AlertTitle id={'title' + i} >{obj}</AlertTitle>
                        {valueList[obj].map((obj2, j) =>
                            <li id={'desc' + j} >{obj2}</li>
                        )}
                    </Alert>
                )}
            </Stack>
        )
}

export default ErrorMessage