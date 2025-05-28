import React from 'react';

// Service pour gérer les URLs d'images
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // Si l'image path est déjà une URL complète, la retourner telle quelle
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Construire l'URL complète pour l'image
  const baseUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  
  // Enlever le slash initial s'il existe pour éviter les doubles slashes
  const cleanImagePath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${baseUrl}/uploads/${cleanImagePath}`;
};

// Fonction pour obtenir l'URL de l'avatar par défaut
const getDefaultAvatarUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
  return `${baseUrl}/uploads/default-avatar.png`;
};

// Fonction pour gérer les erreurs de chargement d'image
const handleImageError = (event, fallbackSrc = null) => {
  const img = event.target;
  
  // Éviter les boucles infinies
  if (img.hasAttribute('data-error-handled')) {
    return;
  }
  
  img.setAttribute('data-error-handled', 'true');
  
  if (fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // Masquer l'image et afficher une icône de remplacement
    img.style.display = 'none';
    
    // Créer un élément de remplacement si pas déjà créé
    if (!img.nextElementSibling?.classList.contains('avatar-fallback')) {
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'avatar-fallback text-center d-flex align-items-center justify-content-center';
      fallbackDiv.style.cssText = `
        width: ${img.width || 100}px; 
        height: ${img.height || 100}px; 
        background-color: #f8f9fa; 
        border: 1px solid #dee2e6; 
        border-radius: ${img.classList.contains('rounded-circle') ? '50%' : '0.375rem'};
        color: #6c757d;
      `;
      fallbackDiv.innerHTML = '<i class="fas fa-user fa-2x"></i>';
      img.parentNode.insertBefore(fallbackDiv, img.nextSibling);
    }
  }
};

// Composant React pour l'affichage d'avatar avec gestion d'erreur
const AvatarImage = ({ 
  src, 
  alt = "Avatar", 
  className = "", 
  style = {}, 
  width = 100, 
  height = 100,
  onError,
  ...props 
}) => {
  const handleError = (e) => {
    if (onError) {
      onError(e);
    } else {
      handleImageError(e, getDefaultAvatarUrl());
    }
  };

  const imageUrl = getImageUrl(src) || getDefaultAvatarUrl();

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={{ width, height, objectFit: 'cover', ...style }}
      onError={handleError}
      {...props}
    />
  );
};

export { 
  getImageUrl, 
  getDefaultAvatarUrl, 
  handleImageError, 
  AvatarImage 
};