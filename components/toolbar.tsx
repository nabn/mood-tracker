import AuthButtonServer from "./auth-button-server";
import RouteButton from "./route-button";

export function Toolbar() {
  return (
    <nav>
      <ul role="menubar" className="flex gap-2 justify-end">
        <li>
          <RouteButton />
        </li>
        <li>
          <AuthButtonServer />
        </li>
      </ul>
    </nav>
  );
}
