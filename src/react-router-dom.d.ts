import "react-router-dom";

declare module "react-router-dom" {
  export function useNavigate(): (to: string) => void;
  export function useParams<Params extends Record<string, string | undefined> = Record<string, string | undefined>>(): Params;
  export function useLocation(): { pathname: string; search: string; hash: string; state: unknown; key: string };
  export function BrowserRouter(props: { children: React.ReactNode }): React.ReactElement;
  export function Routes(props: { children: React.ReactNode }): React.ReactElement;
  export function Route(props: { path?: string; element?: React.ReactNode; children?: React.ReactNode }): React.ReactElement;
  export function Link(props: { to: string; children?: React.ReactNode; className?: string; style?: React.CSSProperties; onClick?: () => void; key?: string | number }): React.ReactElement;
}
