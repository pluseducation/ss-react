import React, {useRef} from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../components/cropImage";
import Loading from '../../components/loading'
import { tokens } from "../../theme";
import { Button, Box, useTheme } from "@mui/material";
import translate from "../../i18nProvider/translate";
import useAxiosPrivate from "../../hook/useAxiosPrivate";
import { useFormikContext } from "formik";
import Tesseract, { createWorker } from "tesseract.js";
import LinearProgress from '@mui/material/LinearProgress';

const aspectRatios = [
    { value: 1 / 1, text: "1/1" },
];

const TestOCR = (url) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const axiosPrivate = useAxiosPrivate();
    const formik = useFormikContext();

    const [imageUrl, setImageUrl] = React.useState(url.url);
    const [imageData, setImageData] = React.useState(null);
    const [progress, setProgress] = React.useState();
    const [progressLabel, setProgressLabel] = React.useState();

    const [zoom, setZoom] = React.useState(1);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [aspect, setAspect] = React.useState(aspectRatios[0]);
    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
    const [ocr, setOcr] = React.useState("");

    

    const handleExtract = async () => {
        const worker = await createWorker({
            logger: m => console.log(m)
          });
          
          (async () => {
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize(imageUrl);
            setOcr(text);
            await worker.terminate();
          })();
    }

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
        //setImageUrl(croppedImageUrl);
        uploadImage(croppedImageUrl)
    };

    const onOCR = async () => {

    }

    function onImageChange(e) {
        setImageUrl(URL.createObjectURL(...e.target.files))
        //uploadImage(...e.target.files)

        // const file = e.target.files[0];
        // if (!file) return;
        // const reader = new FileReader();
        // reader.onloadend = () => {
        //     const imageDataUri = reader.result;
        //     console.log({ imageDataUri });
        //     setImageData(imageDataUri);
        // };
        // reader.readAsDataURL(file);
    }

    function uploadImage(file) {

        const formData = new FormData()
        formData.append("file", file)

        axiosPrivate.postForm('/util/upload-promo-image', formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            formik.values.image_id = res.data.data.id
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
                <Button color="secondary" variant="contained" onClick={handleExtract} > OCR</Button>
            </Box>
            <Box>
                {/* <h2>{progressLabel}</h2>
                <LinearProgress value={progress * 100} ></LinearProgress> */}
                <h2>RESULT</h2>
                <p>{ocr}</p>
            </Box>
        </Box>
    );

};

export default TestOCR;
