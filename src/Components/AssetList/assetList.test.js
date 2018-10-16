import React from "react";
import { shallow } from "enzyme";
import AssetList from ".";

describe("<AssetList>", () => {
  let assetList;

  describe("Given no assets", () => {
    it("Renders nothing", () => {
      let assetList = shallow(<AssetList assets={[]} />);

      expect(assetList.find('[data-test="asset"]').length).toEqual(0);
    });
  });

  describe("Given one asset", () => {
    describe("Example one", () => {
      beforeEach(() => {
        assetList = shallow(
          <AssetList
            assets={[
              {
                id: "CT-01",
                name: "Cat House",
                address: "1 Cat Street",
                value: "£ 5,000,000.00"
              }
            ]}
          />
        );
      });

      it("Renders a single asset", () => {
        expect(assetList.find('[data-test="asset"]').length).toEqual(1);
      });

      it("Gives the asset a key matching the  ID", () => {
        let asset = assetList.find('[data-test="asset"]');

        expect(asset.key()).toEqual("CT-01");
      });

      it("Renders the asset name", () => {
        expect(assetList.find('[data-test="asset-name"]').text()).toEqual(
          "Cat House"
        );
      });

      it("Renders the asset address", () => {
        expect(assetList.find('[data-test="asset-address"]').text()).toEqual(
          "1 Cat Street"
        );
      });

      it("Renders the asset value", () => {
        expect(assetList.find('[data-test="asset-value"]').text()).toEqual(
          "£ 5,000,000.00"
        );
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        assetList = shallow(
          <AssetList
            assets={[
              {
                id: "DG-11",
                name: "Dog House",
                address: "1 Woofers Street",
                value: "£ 3,333,333.33"
              }
            ]}
          />
        );
      });

      it("Renders a single asset", () => {
        expect(assetList.find('[data-test="asset"]').length).toEqual(1);
      });

      it("Gives the asset a key matching the  ID", () => {
        let asset = assetList.find('[data-test="asset"]');

        expect(asset.key()).toEqual("DG-11");
      });

      it("Renders the asset name", () => {
        expect(assetList.find('[data-test="asset-name"]').text()).toEqual(
          "Dog House"
        );
      });

      it("Renders the asset address", () => {
        expect(assetList.find('[data-test="asset-address"]').text()).toEqual(
          "1 Woofers Street"
        );
      });

      it("Renders the asset value", () => {
        expect(assetList.find('[data-test="asset-value"]').text()).toEqual(
          "£ 3,333,333.33"
        );
      });
    });
  });

  describe("Given multiple assets", () => {
    let assets;

    beforeEach(() => {
      assetList = shallow(
        <AssetList
          assets={[
            {
              id: "CT-01",
              name: "Cat House",
              address: "1 Cat Street",
              value: "£ 5,000,000.00"
            },
            {
              id: "CT-21",
              name: "Kitten House",
              address: "2 Cat Street",
              value: "£ 7,000,000.00"
            }
          ]}
        />
      );

      assets = assetList.find('[data-test="asset"]')
    });

    it("Renders multiple assets", () => {
      expect(assetList.find('[data-test="asset"]').length).toEqual(2);
    });

    it("Sets the asset keys", () => {
      expect(assets.at(0).key()).toEqual("CT-01")
      expect(assets.at(1).key()).toEqual("CT-21")
    });

    it("Renders the asset names", () => {
      expect(assets.at(0).find('[data-test="asset-name"]').text()).toEqual("Cat House")
      expect(assets.at(1).find('[data-test="asset-name"]').text()).toEqual("Kitten House")
    });

    it("Renders the asset addresses", () => {
      expect(assets.at(0).find('[data-test="asset-address"]').text()).toEqual("1 Cat Street")
      expect(assets.at(1).find('[data-test="asset-address"]').text()).toEqual("2 Cat Street")
    });

    it("Renders the asset value", () => {
      expect(assets.at(0).find('[data-test="asset-value"]').text()).toEqual("£ 5,000,000.00")
      expect(assets.at(1).find('[data-test="asset-value"]').text()).toEqual("£ 7,000,000.00")
    });
  });
});
