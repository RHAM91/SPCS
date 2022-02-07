<template>
    <div class="contenedor_foto">
        <div class="area_foto">
            <video autoplay></video>
            <canvas width="720" height="640"></canvas>
        </div>
        <div class="botones_foto">
            <div class="btn_tomar_foto" @click="takePhoto">
                <i class="fas fa-camera"></i>
            </div>
            <div class="btn_cerrar_ventana" @click="cerrar">
                <i class="far fa-times-circle"></i>
            </div>
        </div>
    </div>
</template>

<script>

import stopMediaStream from 'stop-media-stream'
import { mapActions } from 'vuex'


let video
var mediaStream


export default {
    name: 'TomarFoto',
    props:['iMiembro'],
    data() {
        return {
            
        }
    },
    methods: {
        cerrar(){
            stopMediaStream(mediaStream)
            this.$emit('salir')
        },
        async iniciar(){
            
            try {
                video = window.document.querySelector('video')
                
                mediaStream = await navigator.mediaDevices.getUserMedia({audio: false, video: {width: 720, height: 640}})
                video.srcObject = mediaStream

            } catch (e) {
                console.log(e)
            }

        },
        async takePhoto(){
            let canvas = window.document.querySelector('canvas');
            canvas.getContext('2d').drawImage(video, 0, 0, 720, 640);

            let photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            
            let f =  {
                api: 'fotos',
                pull: false,
                formulario: {
                    dpi: this.iMiembro.dpi,
                    photoData
                }
            }

            await this.saveData(f)

        },
        ...mapActions(['saveData'])
    },
    mounted() {
        this.iniciar()
    },
}
</script>

<style>
    #saveFile, canvas {
        display: none;
    }


    .contenedor_foto{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .area_foto{
            width: 720px;
            height: 640px;
        }
    .botones_foto{
        width: 60px;
        height: 140px;
        position: absolute;
        bottom: 10px;
        right: 20px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
        .btn_tomar_foto{
            background-color: #FFFD82;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: black;
            font-size: 24px;
            cursor: pointer;
            user-select: none;
            transition: .2s;
        }
            .btn_tomar_foto:active{
                background-color: #1B998B;
                color: white;
            }

        .btn_cerrar_ventana{
            background-color: #FE5D26;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 10px;
            color: white;
            font-size: 24px;
            cursor: pointer;
            user-select: none;
            transition: .2s;
            margin: auto;
        }
            .btn_cerrar_ventana:active{
                background-color: #E28413;
                color: white;
            }
</style>