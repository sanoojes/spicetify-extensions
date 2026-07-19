(async () => {
  const _wait = (p, a = 0) =>
    new Promise((res, rej) => {
      const i = setInterval(() => {
        if (p()) return (clearInterval(i), res());
        if (++a > 1e3) return (clearInterval(i), rej(new Error("Timeout")));
      }, 50);
    });
  try {
    const S = window.Spicetify;
    if (S.Events?.platformLoaded?.on) await new Promise((r) => S.Events.platformLoaded.on(r));
    if (S.Events?.webpackLoaded?.on) await new Promise((r) => S.Events.webpackLoaded.on(r));
    await _wait(() => S?.React && S?.ReactJSX && S?.ReactDOM && S?.Platform && S?.Player);
    console.info(
      `%c[${"wherenowplaying"}:${"extension"}] %cv${"0.0.1"} %cinitialized`,
      "color: #1DB954; font-weight: bold",
      "color: #888",
      "color: unset",
    );
    /* --- START --- */ (async function () {
      // src/utils.ts
      function waitForElement(selector, parent = document.body) {
        return new Promise((resolve) => {
          const elm = parent.querySelector(selector);
          if (elm) {
            return resolve(elm);
          }
          const observer = new MutationObserver((_) => {
            const elm2 = parent.querySelector(selector);
            if (elm2) {
              observer.disconnect();
              resolve(elm2);
            }
          });
          observer.observe(parent, {
            childList: true,
            subtree: true,
          });
        });
      }

      // src/app.ts
      var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      async function main() {
        while (!Spicetify?.Player?.data || !Spicetify?.Platform?.History) {
          await sleep(250);
        }
        function onNavigate(ev) {
          ev.preventDefault();
          ev.stopPropagation();
          ev.stopImmediatePropagation();
          const { data } = Spicetify.Player;
          if (!data?.context?.uri || !data?.item) return;
          const [, type, id, subType] = data.context.uri.split(":");
          let pathname = `/${type}/${id}`;
          const searchParams = new URLSearchParams({
            uid: data.item.uid,
            uri: data.item.uri,
          });
          if (type === "list") {
            const coverButton = document.querySelector(
              ".main-nowPlayingView-coverArtVisualEnhancement a[aria-label^='Now playing']",
            );
            const preservedPath = coverButton?.getAttribute("data-href");
            if (preservedPath) {
              const parsedUrl = new URL(preservedPath, window.location.origin);
              pathname = parsedUrl.pathname;
              parsedUrl.searchParams.forEach((value, key) => {
                searchParams.set(key, value);
              });
            }
          } else if (type === "user" && subType === "collection") {
            pathname = "/collection/tracks";
          }
          const search = `?${searchParams.toString()}`;
          console.log("Navigating to:", pathname, "with search:", search);
          Spicetify.Platform.History.push({
            pathname,
            search,
          });
        }
        const playingBar = await waitForElement(".Root__right-sidebar, #Desktop_PanelContainer_Id");
        let lastCoverButton = null;
        let lastCanvasContainer = null;
        function hookElements() {
          const coverButton = playingBar.querySelector(
            ".main-nowPlayingView-coverArtVisualEnhancement a[aria-label^='Now playing']",
          );
          if (coverButton !== lastCoverButton) {
            if (lastCoverButton) {
              lastCoverButton.removeEventListener("click", onNavigate, true);
            }
            lastCoverButton = coverButton;
            if (coverButton) {
              if (coverButton.hasAttribute("href")) {
                coverButton.setAttribute("data-href", coverButton.getAttribute("href"));
                coverButton.removeAttribute("href");
                coverButton.style.cursor = "pointer";
              }
              coverButton.addEventListener("click", onNavigate, true);
            }
          }
          const canvasContainer = playingBar.querySelector(".canvasVideoContainerNPV");
          if (canvasContainer !== lastCanvasContainer) {
            if (lastCanvasContainer) {
              lastCanvasContainer.removeEventListener("dblclick", onNavigate, true);
            }
            lastCanvasContainer = canvasContainer;
            if (canvasContainer) {
              canvasContainer.style.cursor = "pointer";
              canvasContainer.addEventListener("dblclick", onNavigate, true);
            }
          }
        }
        const observer = new MutationObserver(hookElements);
        observer.observe(playingBar, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["href", "class"],
        });
        hookElements();
      }
      main();
    })();
    //# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL3V0aWxzLnRzIiwgIi4uLy4uL3NyYy9hcHAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiB3YWl0Rm9yRWxlbWVudDxUIGV4dGVuZHMgRWxlbWVudD4oc2VsZWN0b3I6IHN0cmluZywgcGFyZW50PWRvY3VtZW50LmJvZHkpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IGVsbSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yPFQ+KHNlbGVjdG9yKVxuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShlbG0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKF8gPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxtID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3I8VD4oc2VsZWN0b3IpXG4gICAgICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZWxtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwYXJlbnQsIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSk7XG59IiwgImltcG9ydCB7IHdhaXRGb3JFbGVtZW50IH0gZnJvbSBcIi4vdXRpbHMudHNcIjtcblxuY29uc3Qgc2xlZXAgPSAobXM6IG51bWJlcikgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKTtcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcbiAgd2hpbGUgKCFTcGljZXRpZnk/LlBsYXllcj8uZGF0YSB8fCAhU3BpY2V0aWZ5Py5QbGF0Zm9ybT8uSGlzdG9yeSkge1xuICAgIGF3YWl0IHNsZWVwKDI1MCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbk5hdmlnYXRlKGV2OiBNb3VzZUV2ZW50KSB7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldi5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuICAgIGNvbnN0IHsgZGF0YSB9ID0gU3BpY2V0aWZ5LlBsYXllcjtcbiAgICBpZiAoIWRhdGE/LmNvbnRleHQ/LnVyaSB8fCAhZGF0YT8uaXRlbSkgcmV0dXJuO1xuXG4gICAgY29uc3QgWywgdHlwZSwgaWQsIHN1YlR5cGVdID0gZGF0YS5jb250ZXh0LnVyaS5zcGxpdChcIjpcIik7XG4gICAgbGV0IHBhdGhuYW1lID0gYC8ke3R5cGV9LyR7aWR9YDtcbiAgICBcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIHVpZDogZGF0YS5pdGVtLnVpZCxcbiAgICAgIHVyaTogZGF0YS5pdGVtLnVyaSxcbiAgICB9KTtcblxuICAgIGlmICh0eXBlID09PSBcImxpc3RcIikge1xuICAgICAgY29uc3QgY292ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAgICAgXCIubWFpbi1ub3dQbGF5aW5nVmlldy1jb3ZlckFydFZpc3VhbEVuaGFuY2VtZW50IGFbYXJpYS1sYWJlbF49J05vdyBwbGF5aW5nJ11cIlxuICAgICAgKTtcbiAgICAgIFxuICAgICAgY29uc3QgcHJlc2VydmVkUGF0aCA9IGNvdmVyQnV0dG9uPy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG4gICAgICBcbiAgICAgIGlmIChwcmVzZXJ2ZWRQYXRoKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFVybCA9IG5ldyBVUkwocHJlc2VydmVkUGF0aCx3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbiAgICAgICAgcGF0aG5hbWUgPSBwYXJzZWRVcmwucGF0aG5hbWU7XG4gICAgICAgIFxuICAgICAgICBwYXJzZWRVcmwuc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICBzZWFyY2hQYXJhbXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwidXNlclwiICYmIHN1YlR5cGUgPT09IFwiY29sbGVjdGlvblwiKSB7XG4gICAgICBwYXRobmFtZSA9IFwiL2NvbGxlY3Rpb24vdHJhY2tzXCI7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoID0gYD8ke3NlYXJjaFBhcmFtcy50b1N0cmluZygpfWA7XG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvOlwiLCBwYXRobmFtZSwgXCJ3aXRoIHNlYXJjaDpcIiwgc2VhcmNoKTtcblxuICAgIFNwaWNldGlmeS5QbGF0Zm9ybS5IaXN0b3J5LnB1c2goe1xuICAgICAgcGF0aG5hbWUsXG4gICAgICBzZWFyY2g6IHNlYXJjaCxcbiAgICB9KTtcbiAgICAvLyBjb25zb2xlLmxvZyhgU3BpY2V0aWZ5LlBsYXRmb3JtLkhpc3RvcnkucHVzaCh7cGF0aG5hbWU6XCIke3BhdGhuYW1lfVwiLHNlYXJjaDpcIiR7c2VhcmNofVwifSlgKVxuICB9XG5cbiAgY29uc3QgcGxheWluZ0JhciA9IGF3YWl0IHdhaXRGb3JFbGVtZW50PEhUTUxEaXZFbGVtZW50PihcbiAgICBcIi5Sb290X19yaWdodC1zaWRlYmFyLCAjRGVza3RvcF9QYW5lbENvbnRhaW5lcl9JZFwiXG4gICk7XG5cbiAgbGV0IGxhc3RDb3ZlckJ1dHRvbjogSFRNTEFuY2hvckVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgbGV0IGxhc3RDYW52YXNDb250YWluZXI6IEhUTUxEaXZFbGVtZW50IHwgbnVsbCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gaG9va0VsZW1lbnRzKCkge1xuICAgIGNvbnN0IGNvdmVyQnV0dG9uID0gcGxheWluZ0Jhci5xdWVyeVNlbGVjdG9yPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAgIFwiLm1haW4tbm93UGxheWluZ1ZpZXctY292ZXJBcnRWaXN1YWxFbmhhbmNlbWVudCBhW2FyaWEtbGFiZWxePSdOb3cgcGxheWluZyddXCJcbiAgICApO1xuXG4gICAgaWYgKGNvdmVyQnV0dG9uICE9PSBsYXN0Q292ZXJCdXR0b24pIHtcbiAgICAgIGlmIChsYXN0Q292ZXJCdXR0b24pIHtcbiAgICAgICAgbGFzdENvdmVyQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvbk5hdmlnYXRlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgbGFzdENvdmVyQnV0dG9uID0gY292ZXJCdXR0b247XG4gICAgICBcbiAgICAgIGlmIChjb3ZlckJ1dHRvbikge1xuICAgICAgICBpZiAoY292ZXJCdXR0b24uaGFzQXR0cmlidXRlKFwiaHJlZlwiKSkge1xuICAgICAgICAgIGNvdmVyQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiLCBjb3ZlckJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpISk7XG4gICAgICAgICAgY292ZXJCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiaHJlZlwiKTtcbiAgICAgICAgICBjb3ZlckJ1dHRvbi5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb3ZlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb25OYXZpZ2F0ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzQ29udGFpbmVyID0gcGxheWluZ0Jhci5xdWVyeVNlbGVjdG9yPEhUTUxEaXZFbGVtZW50PihcbiAgICAgIFwiLmNhbnZhc1ZpZGVvQ29udGFpbmVyTlBWXCJcbiAgICApO1xuICAgIFxuICAgIGlmIChjYW52YXNDb250YWluZXIgIT09IGxhc3RDYW52YXNDb250YWluZXIpIHtcbiAgICAgIGlmIChsYXN0Q2FudmFzQ29udGFpbmVyKSB7XG4gICAgICAgIGxhc3RDYW52YXNDb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsIG9uTmF2aWdhdGUsIHRydWUpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBsYXN0Q2FudmFzQ29udGFpbmVyID0gY2FudmFzQ29udGFpbmVyO1xuICAgICAgXG4gICAgICBpZiAoY2FudmFzQ29udGFpbmVyKSB7XG4gICAgICAgIGNhbnZhc0NvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSBcInBvaW50ZXJcIjtcbiAgICAgICAgY2FudmFzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCBvbk5hdmlnYXRlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGhvb2tFbGVtZW50cyk7XG4gIFxuICBvYnNlcnZlci5vYnNlcnZlKHBsYXlpbmdCYXIsIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW1wiaHJlZlwiLCBcImNsYXNzXCJdLFxuICB9KTtcblxuICBob29rRWxlbWVudHMoKTtcbn1cblxubWFpbigpOyJdLAogICJtYXBwaW5ncyI6ICI7QUFBTyxTQUFTLGVBQWtDLFVBQWtCLFNBQU8sU0FBUyxNQUFrQjtBQUNsRyxTQUFPLElBQUksUUFBUSxhQUFXO0FBQzFCLFVBQU0sTUFBTSxPQUFPLGNBQWlCLFFBQVE7QUFDNUMsUUFBSSxLQUFLO0FBQ0wsYUFBTyxRQUFRLEdBQUc7QUFBQSxJQUN0QjtBQUVBLFVBQU0sV0FBVyxJQUFJLGlCQUFpQixPQUFLO0FBQ3ZDLFlBQU1BLE9BQU0sT0FBTyxjQUFpQixRQUFRO0FBQzVDLFVBQUlBLE1BQUs7QUFDTCxpQkFBUyxXQUFXO0FBQ3BCLGdCQUFRQSxJQUFHO0FBQUEsTUFDZjtBQUFBLElBQ0osQ0FBQztBQUVELGFBQVMsUUFBUSxRQUFRO0FBQUEsTUFDckIsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0wsQ0FBQztBQUNMOzs7QUNsQkEsSUFBTSxRQUFRLENBQUMsT0FBZSxJQUFJLFFBQVEsQ0FBQyxZQUFZLFdBQVcsU0FBUyxFQUFFLENBQUM7QUFFOUUsZUFBZSxPQUFPO0FBQ3BCLFNBQU8sQ0FBQyxXQUFXLFFBQVEsUUFBUSxDQUFDLFdBQVcsVUFBVSxTQUFTO0FBQ2hFLFVBQU0sTUFBTSxHQUFHO0FBQUEsRUFDakI7QUFFQSxXQUFTLFdBQVcsSUFBZ0I7QUFDbEMsT0FBRyxlQUFlO0FBQ2xCLE9BQUcsZ0JBQWdCO0FBQ25CLE9BQUcseUJBQXlCO0FBRTVCLFVBQU0sRUFBRSxLQUFLLElBQUksVUFBVTtBQUMzQixRQUFJLENBQUMsTUFBTSxTQUFTLE9BQU8sQ0FBQyxNQUFNLEtBQU07QUFFeEMsVUFBTSxDQUFDLEVBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxNQUFNLEdBQUc7QUFDeEQsUUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLEVBQUU7QUFFN0IsVUFBTSxlQUFlLElBQUksZ0JBQWdCO0FBQUEsTUFDdkMsS0FBSyxLQUFLLEtBQUs7QUFBQSxNQUNmLEtBQUssS0FBSyxLQUFLO0FBQUEsSUFDakIsQ0FBQztBQUVELFFBQUksU0FBUyxRQUFRO0FBQ25CLFlBQU0sY0FBYyxTQUFTO0FBQUEsUUFDM0I7QUFBQSxNQUNGO0FBRUEsWUFBTSxnQkFBZ0IsYUFBYSxhQUFhLFdBQVc7QUFFM0QsVUFBSSxlQUFlO0FBQ2pCLGNBQU0sWUFBWSxJQUFJLElBQUksZUFBYyxPQUFPLFNBQVMsTUFBTTtBQUM5RCxtQkFBVyxVQUFVO0FBRXJCLGtCQUFVLGFBQWEsUUFBUSxDQUFDLE9BQU8sUUFBUTtBQUM3Qyx1QkFBYSxJQUFJLEtBQUssS0FBSztBQUFBLFFBQzdCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixXQUFXLFNBQVMsVUFBVSxZQUFZLGNBQWM7QUFDdEQsaUJBQVc7QUFBQSxJQUNiO0FBRUEsVUFBTSxTQUFTLElBQUksYUFBYSxTQUFTLENBQUM7QUFDMUMsWUFBUSxJQUFJLGtCQUFrQixVQUFVLGdCQUFnQixNQUFNO0FBRTlELGNBQVUsU0FBUyxRQUFRLEtBQUs7QUFBQSxNQUM5QjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUVIO0FBRUEsUUFBTSxhQUFhLE1BQU07QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLGtCQUE0QztBQUNoRCxNQUFJLHNCQUE2QztBQUVqRCxXQUFTLGVBQWU7QUFDdEIsVUFBTSxjQUFjLFdBQVc7QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFFQSxRQUFJLGdCQUFnQixpQkFBaUI7QUFDbkMsVUFBSSxpQkFBaUI7QUFDbkIsd0JBQWdCLG9CQUFvQixTQUFTLFlBQVksSUFBSTtBQUFBLE1BQy9EO0FBRUEsd0JBQWtCO0FBRWxCLFVBQUksYUFBYTtBQUNmLFlBQUksWUFBWSxhQUFhLE1BQU0sR0FBRztBQUNwQyxzQkFBWSxhQUFhLGFBQWEsWUFBWSxhQUFhLE1BQU0sQ0FBRTtBQUN2RSxzQkFBWSxnQkFBZ0IsTUFBTTtBQUNsQyxzQkFBWSxNQUFNLFNBQVM7QUFBQSxRQUM3QjtBQUNBLG9CQUFZLGlCQUFpQixTQUFTLFlBQVksSUFBSTtBQUFBLE1BQ3hEO0FBQUEsSUFDRjtBQUVBLFVBQU0sa0JBQWtCLFdBQVc7QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFFQSxRQUFJLG9CQUFvQixxQkFBcUI7QUFDM0MsVUFBSSxxQkFBcUI7QUFDdkIsNEJBQW9CLG9CQUFvQixZQUFZLFlBQVksSUFBSTtBQUFBLE1BQ3RFO0FBRUEsNEJBQXNCO0FBRXRCLFVBQUksaUJBQWlCO0FBQ25CLHdCQUFnQixNQUFNLFNBQVM7QUFDL0Isd0JBQWdCLGlCQUFpQixZQUFZLFlBQVksSUFBSTtBQUFBLE1BQy9EO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFdBQVcsSUFBSSxpQkFBaUIsWUFBWTtBQUVsRCxXQUFTLFFBQVEsWUFBWTtBQUFBLElBQzNCLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULFlBQVk7QUFBQSxJQUNaLGlCQUFpQixDQUFDLFFBQVEsT0FBTztBQUFBLEVBQ25DLENBQUM7QUFFRCxlQUFhO0FBQ2Y7QUFFQSxLQUFLOyIsCiAgIm5hbWVzIjogWyJlbG0iXQp9Cg==
  } catch (err) {
    /* --- END --- */ const msg = err.message === "Timeout" ? `Dependency timeout` : `Crashed`;
    window.Spicetify?.showNotification(
      `\u26A0\uFE0F ${appId}: ${msg} (check console for more info)`,
      true,
    );
    console.error(`[${appId}] Error:`, err);
  }
})();
