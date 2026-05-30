import { spawn } from 'child_process';

console.log('=== SYSTEM DIAGNOSTIC WORKFLOW ===');
console.log('Node version:', process.version);
console.log('Current workspace:', process.cwd());

const checkPath = (binaryName) => {
  return new Promise((resolve) => {
    const proc = spawn(binaryName, ['-version']);
    
    proc.on('error', (err) => {
      console.error(`[-] ${binaryName} is not available on this path. Error:`, err.message);
      resolve(false);
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        console.log(`[+] ${binaryName} is available globally.`);
        resolve(true);
      } else {
        console.warn(`[-] ${binaryName} returned error exit code: ${code}`);
        resolve(false);
      }
    });
  });
};

async function run() {
  const ffmpegOk = await checkPath('ffmpeg');
  const ffprobeOk = await checkPath('ffprobe');
  
  if (ffmpegOk && ffprobeOk) {
    console.log('\n[SUCCESS] Environment has all required dependencies.');
  } else {
    console.error('\n[WARNING] One or more dependencies are missing. Please make sure FFmpeg & FFprobe are added to your Path.');
  }
}

run();
