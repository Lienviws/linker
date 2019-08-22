/** 
 * 参考axios
 */

export interface IError extends Error {
    code?: string
}

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @returns {Error} The created error.
 */
export function createError(message: string, code?: string) {
    const error = new Error(message)
    return enhanceError(error, code)
}

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @returns {Error} The error.
 */
function enhanceError(error: IError, code?: string) {
    if (code) {
        error.code = code;
    }

    Object.assign(error, {
        isLinkerError: true,
        toJSON: () => {
            return {
                // Standard
                message: error.message,
                name: error.name,
                // linker
                code: error.code
            }
        }
    })

    return error
}
