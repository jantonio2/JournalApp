import { fileUpload } from './../../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dirvh12z0', 
  api_key: '573476787932293', 
  api_secret: '31otQ9JgFj3TBeObk2gRPZOdbtE',
  secure: true
});

describe('Pruebas en fileUpload', () => {
  test('debe de cargar un archivo y retornar el URL', async() => {
    const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const url = await fileUpload(file);

    expect(typeof url).toBe('string');

    // Borrando la imagen por ID
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    
    await cloudinary.api.delete_resources(imageId, {}, () => {});
  });

  test('debe de retornar un error', async() => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
