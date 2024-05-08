import P5Sketch from '../components/p5-sketch';
import { useParams} from 'react-router-dom'
export default function Results() {
    const { id: _id } = useParams()
    console.log(_id);
    return <>
    
    <div className='container'>
      <div className='sketch'>
    

    <P5Sketch seed = {_id} />
    </div>
    </div>
    
    </>
}
