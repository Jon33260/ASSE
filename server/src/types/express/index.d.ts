// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      user: {
        role: string;
        id: number;
        Nom: string;
        Prenom: string;
        Email: string;
        is_admin: boolean;
      };
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... }
      /* ************************************************************************* */
    }
  }
}
