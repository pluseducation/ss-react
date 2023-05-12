import React from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../components/cropImage";
import Loading from '../../../components/loading'
import { tokens } from "../../../theme";
import { Button, Box, useTheme } from "@mui/material";
import translate from "../../../i18nProvider/translate";
import useAxiosPrivate from "../../../hook/useAxiosPrivate";
import { Height } from "@mui/icons-material";

const aspectRatios = [
    { value: 1 / 1, text: "1/1" },
];

const UploadImage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();
    const [imageUrl, setImageUrl] = React.useState(null);

    const [zoom, setZoom] = React.useState(1);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [aspect, setAspect] = React.useState(aspectRatios[0]);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
        setImageUrl(croppedImageUrl);
        //uploadImage(...e.target.files)
    };

    function onImageChange(e) {
        setImageUrl(URL.createObjectURL(...e.target.files))
        //uploadImage(...e.target.files)
    }

    function uploadImage(file) {

        const formData = new FormData()
        formData.append("file", file)

        axiosPrivate.postForm('/util/upload-promo-image', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            setImageUrl(res.data.data.image)
        });
    }

    return (
        <Box display='flex' flexDirection='column' gap={2} justifyContent='center' sx={{ gridColumn: "span 12" }} >
            <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
                <div className="crop-container">
                    <Cropper
                        image={imageUrl}
                        zoom={zoom}
                        crop={crop}
                        aspect={aspect.value}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropComplete}
                    />
                </div>
            </Box>

            {/* <img src={imageUrl}></img> */}
            <Box display='flex' justifyContent='center' gap={2} >
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload
                    <input
                        type="file"
                        multiple accept="image/*"
                        onChange={onImageChange}
                        hidden
                    />
                </Button>
                <Button color="secondary" variant="contained" onClick={onCrop} > Crop</Button>
            </Box>
        </Box>
    );

};

export default UploadImage;
