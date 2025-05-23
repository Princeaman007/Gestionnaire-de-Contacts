/**
 * Classe pour créer des réponses d'erreur personnalisées
 * @class ErrorResponse
 * @extends Error
 */
class ErrorResponse extends Error {
  /**
   * @param {string} message - Le message d'erreur
   * @param {number} statusCode - Le code HTTP de l'erreur
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;