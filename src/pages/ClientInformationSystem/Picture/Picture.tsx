import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, Upload } from 'lucide-react';
import Button from 'atomic-components/Button/Button';
import styles from '../ClientInformationSystemInsert.module.scss';
import PictureStyles from './Picture.module.scss';

type ImageType = 'Picture1' | 'Picture2' | 'Signature1' | 'Signature2';

interface PictureTabProps {
  formData?: {
    clientPicture1?: string;
    clientPicture2?: string;
    signaturePicture1?: string;
    signaturePicture2?: string;
  };
  onInputChange?: (
    field:
      | 'clientPicture1'
      | 'clientPicture2'
      | 'signaturePicture1'
      | 'signaturePicture2',
    value: string,
  ) => void;
}

function PictureTab({ formData, onInputChange }: PictureTabProps) {
  const [selectedImageType, setSelectedImageType] =
    useState<ImageType>('Picture1');
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Get the current image based on selected type
  const getCurrentImageValue = useCallback(() => {
    if (!formData) return null;
    switch (selectedImageType) {
      case 'Picture1':
        return formData.clientPicture1 || null;
      case 'Picture2':
        return formData.clientPicture2 || null;
      case 'Signature1':
        return formData.signaturePicture1 || null;
      case 'Signature2':
        return formData.signaturePicture2 || null;
      default:
        return null;
    }
  }, [formData, selectedImageType]);

  // Update current image when image type or formData changes
  useEffect(() => {
    const imageValue = getCurrentImageValue();
    setCurrentImage(imageValue);
  }, [getCurrentImageValue, selectedImageType, formData]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  }, []);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Handle video element when capturing starts
  useEffect(() => {
    if (isCapturing && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      const handleLoadedMetadata = () => {
        video.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.srcObject = streamRef.current;

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [isCapturing]);

  const handleImageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as ImageType;
    setSelectedImageType(newType);
    // Stop any active camera stream when switching types
    stopCamera();
  };

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        setCurrentImage(base64String);
        if (onInputChange) {
          const fieldName =
            selectedImageType === 'Picture1'
              ? 'clientPicture1'
              : selectedImageType === 'Picture2'
                ? 'clientPicture2'
                : selectedImageType === 'Signature1'
                  ? 'signaturePicture1'
                  : 'signaturePicture2';
          onInputChange(fieldName, base64String);
        }
      };
      reader.onerror = () => {
        alert('Failed to read the image file.');
      };
      reader.readAsDataURL(file);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [selectedImageType, onInputChange],
  );

  const handleCapture = useCallback(async () => {
    try {
      if (isCapturing) {
        // Stop camera if already capturing
        stopCamera();
        return;
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });

      streamRef.current = stream;
      setIsCapturing(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setIsCapturing(false);
      alert(
        'Unable to access camera. Please ensure you have granted camera permissions.',
      );
    }
  }, [isCapturing, stopCamera]);

  const handleCaptureClick = useCallback(() => {
    void handleCapture();
  }, [handleCapture]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Mirror the image horizontally (like the video preview)
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0);
      ctx.restore();
      const base64String = canvas.toDataURL('image/jpeg', 0.9);
      setCurrentImage(base64String);

      if (onInputChange) {
        const fieldName =
          selectedImageType === 'Picture1'
            ? 'clientPicture1'
            : selectedImageType === 'Picture2'
              ? 'clientPicture2'
              : selectedImageType === 'Signature1'
                ? 'signaturePicture1'
                : 'signaturePicture2';
        onInputChange(fieldName, base64String);
      }

      // Stop camera after capture
      stopCamera();
    }
  }, [selectedImageType, onInputChange, stopCamera]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const imageTypeOptions: ImageType[] = [
    'Picture1',
    'Picture2',
    'Signature1',
    'Signature2',
  ];

  return (
    <div className={styles.tabContent}>
      <div className={PictureStyles.pictureContainer}>
        {/* Controls Section */}
        <div className={PictureStyles.controlsSection}>
          <div className={PictureStyles.controlsRow}>
            <label className={PictureStyles.label}>Image Type:</label>
            <select
              className={PictureStyles.select}
              value={selectedImageType}
              onChange={handleImageTypeChange}
            >
              {imageTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button
              variant="outline"
              onClick={handleCaptureClick}
              className={PictureStyles.actionButton}
            >
              <Camera size={16} />
              {isCapturing ? 'Stop' : 'Capture'}
            </Button>
            <Button
              variant="outline"
              onClick={handleUploadClick}
              className={PictureStyles.actionButton}
            >
              <Upload size={16} />
              Upload
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>

        {/* Image Display Area */}
        <div className={PictureStyles.imageDisplayArea}>
          {isCapturing ? (
            <div className={PictureStyles.cameraContainer}>
              <video
                ref={videoRef}
                className={PictureStyles.video}
                autoPlay
                playsInline
                muted
                style={{ transform: 'scaleX(-1)' }} // Mirror the video for better UX
              />
              <div className={PictureStyles.cameraControls}>
                <Button variant="primary" onClick={capturePhoto}>
                  Take Photo
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : currentImage ? (
            <div className={PictureStyles.imageWrapper}>
              <img
                src={currentImage}
                alt={selectedImageType}
                className={PictureStyles.image}
              />
              <button
                className={PictureStyles.removeButton}
                onClick={() => {
                  setCurrentImage(null);
                  if (onInputChange) {
                    const fieldName =
                      selectedImageType === 'Picture1'
                        ? 'clientPicture1'
                        : selectedImageType === 'Picture2'
                          ? 'clientPicture2'
                          : selectedImageType === 'Signature1'
                            ? 'signaturePicture1'
                            : 'signaturePicture2';
                    onInputChange(fieldName, '');
                  }
                }}
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ) : (
            <div className={PictureStyles.placeholder}>
              <div className={PictureStyles.placeholderIcon}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <p className={PictureStyles.placeholderText}>
                No {selectedImageType.toLowerCase()} selected
              </p>
              <p className={PictureStyles.placeholderSubtext}>
                Click Capture or Upload to add an image
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PictureTab;
