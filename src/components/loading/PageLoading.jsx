import Lottie from 'react-lottie';
// import MLMProtecLoadingLogo from '@/assets/MLMProtectLoadingLogo';

export default () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    // animationData: MLMProtecLoadingLogo,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};
