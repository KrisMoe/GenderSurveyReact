import styles from '../css/splashpage.module.css'
export default function SplashPage() {
    return <>
    <div className={'container '+styles.center}>
        <h2>Welcome to GenderSurvey</h2>
        <p>Go to Survery to take a suvey and generate a gender</p>
        <p>or</p>
        <p>Go to Random to Look at random gender</p>
    </div>
    
    </>
}