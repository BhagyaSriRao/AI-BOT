import { useEffect, useState } from "react";
import { getModels } from "../api/client";

export default function ModelSwitcher({ value, onChange }) {
  const [models, setModels] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getModels()
      .then((data) => {
        setModels(data);
        // set default provider + model if not already selected
        const firstProvider = Object.keys(data)[0];
        if (firstProvider && !value.provider) {
          onChange({
            provider: firstProvider,
            model: data[firstProvider][0] || "",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to fetch models:", error);
        setModels({});
      })
      .finally(() => setIsLoading(false));
  }, []);

  const providers = Object.keys(models);
  const hasModels =
    providers.length > 0 &&
    Object.values(models).some((list) => list.length > 0);

  return (
    <div className="model-switchers">
      {/* Provider Selector */}
      <div className="model-selector">
        <label className="model-selector-label">Provider</label>
        {isLoading ? (
          <div className="model-selector-loading">Loading...</div>
        ) : hasModels ? (
          <select
            value={value.provider || ""}
            onChange={(e) =>
              onChange({
                provider: e.target.value,
                model: models[e.target.value][0] || "",
              })
            }
            className="model-selector-select"
          >
            <option value="" disabled>
              Select provider
            </option>
            {providers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        ) : (
          <div className="model-selector-loading">No models found</div>
        )}
      </div>

      {/* Model Selector */}
      <div className="model-selector">
        <label className="model-selector-label">Model</label>
        {isLoading ? (
          <div className="model-selector-loading">Loading...</div>
        ) : value.provider && models[value.provider]?.length > 0 ? (
          <select
            value={value.model || ""}
            onChange={(e) =>
              onChange({ ...value, model: e.target.value })
            }
            className="model-selector-select"
          >
            {models[value.provider].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        ) : (
          <div className="model-selector-loading">No models available</div>
        )}
      </div>
    </div>
  );
}