const { Video } = require('../db');

const getAllVideos = async () => {
    return await Video.findAll();
  };

const getVideos = async (req, res) =>{
  try {
    const { videoId } = req.query;
    const totalVideos = await getAllVideos();
    if(videoId) {
      const videoById = await totalVideos.filter(video => video.id.toLowerCase().includes(videoId.toLowerCase()));
      videoById.length?
      res.status(200).send(videoById):
      res.status(404).send('No existe un video con ese identificador');
    } else {
      res.status(200).send(totalVideos);
    }
  } catch (error) {
    console.error(error);
  }
}

const postVideo = async (req, res) =>{
  const {  
    nombre, 
    url, 
    profesor, 
    recursos, 
  } = req.body;
  
  const videoUploaded = await Video.create({
    nombre, 
    url, 
    profesor, 
    recursos,
  });
  res.send('Video subido correctamente');
  };

module.exports = {
  getVideos,
  postVideo,
}