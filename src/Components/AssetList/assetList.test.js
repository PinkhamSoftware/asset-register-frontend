import React from "react";
import { mount, shallow } from "enzyme";
import AssetList from ".";

describe("<AssetList>", () => {
  let assetList;

  const LinkStub = props => (
    <div {...props} data-test="asset-link-spy">
      {props.children}
    </div>
  );

  describe("Given no assets", () => {
    it("Renders the no assets are found message", () => {
      let assetList = shallow(<AssetList assets={[]} />);

      expect(
        assetList.find({ "data-test": "asset-list-no-assets-found" }).length
      ).toEqual(1);
    });
  });

  describe("Given one asset", () => {
    describe("Example one", () => {
      beforeEach(() => {
        assetList = mount(
          <AssetList
            linkComponent={LinkStub}
            assets={[
              {
                id: 123,
                address: "1 Cat Street",
                schemeId: 12345
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

        expect(asset.key()).toEqual("123");
      });

      it("Renders the asset address", () => {
        expect(assetList.find('[data-test="asset-address"]').text()).toEqual(
          "1 Cat Street"
        );
      });

      it("Renders the asset scheme id", () => {
        expect(assetList.find('[data-test="asset-scheme-id"]').text()).toEqual(
          "12345"
        );
      });

      it("Renders the link component handed in via props", () => {
        expect(assetList.find('[data-test="asset-link-spy"]').length).toEqual(
          1
        );
      });

      it("Renders the link to view the single asset.", () => {
        expect(assetList.find('[data-test="asset-link"]').props().to).toEqual(
          "/asset/123"
        );
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        assetList = mount(
          <AssetList
            linkComponent={LinkStub}
            assets={[
              {
                id: 234,
                address: "1 Woofers Street",
                schemeId: 54321
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

        expect(asset.key()).toEqual("234");
      });

      it("Renders the asset address", () => {
        expect(assetList.find('[data-test="asset-address"]').text()).toEqual(
          "1 Woofers Street"
        );
      });

      it("Renders the asset scheme id", () => {
        expect(assetList.find('[data-test="asset-scheme-id"]').text()).toEqual(
          "54321"
        );
      });

      it("Renders the link component handed in via props", () => {
        expect(assetList.find('[data-test="asset-link-spy"]').length).toEqual(
          1
        );
      });

      it("Renders the link to view the single asset.", () => {
        expect(assetList.find('[data-test="asset-link"]').props().to).toEqual(
          "/asset/234"
        );
      });
    });
  });

  describe("Given multiple assets", () => {
    let assets;

    beforeEach(() => {
      assetList = mount(
        <AssetList
          linkComponent={LinkStub}
          assets={[
            {
              id: 235,
              address: "1 Cat Street",
              schemeId: 12345
            },
            {
              id: 236,
              address: "2 Cat Street",
              schemeId: 54321
            }
          ]}
        />
      );

      assets = assetList.find('[data-test="asset"]');
    });

    it("Renders multiple assets", () => {
      expect(assetList.find('[data-test="asset"]').length).toEqual(2);
    });

    it("Sets the asset keys", () => {
      expect(assets.at(0).key()).toEqual("235");
      expect(assets.at(1).key()).toEqual("236");
    });

    it("Renders the asset scheme IDs", () => {
      expect(
        assets
          .at(0)
          .find('[data-test="asset-scheme-id"]')
          .text()
      ).toEqual("12345");

      expect(
        assets
          .at(1)
          .find('[data-test="asset-scheme-id"]')
          .text()
      ).toEqual("54321");
    });

    it("Renders the asset addresses", () => {
      expect(
        assets
          .at(0)
          .find('[data-test="asset-address"]')
          .text()
      ).toEqual("1 Cat Street");

      expect(
        assets
          .at(1)
          .find('[data-test="asset-address"]')
          .text()
      ).toEqual("2 Cat Street");
    });
  });
});
