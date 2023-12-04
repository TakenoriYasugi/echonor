import React, { useState, useEffect } from 'react';
import licenseData from '../license/license_info.json'; // JSONデータのインポート
import { Box, Link, Typography } from '@mui/material';

// ライセンス情報の型定義
interface License {
  name: string;
  licenses: string;
  repository: string;
  publisher: string;
  email: string | null;
  url: string | null;
}

const LicenseInfo: React.FC = () => {
  // ライセンス情報の状態
  const [licenses, setLicenses] = useState<License[]>([]);

  // コンポーネントがマウントされた際にライセンス情報を設定
  useEffect(() => {
    // JSONデータからライセンス情報を抽出して状態に設定
    const formattedData = Object.entries(licenseData).map(([key, value]) => ({
      name: key,
      // @ts-ignore
      licenses: value.licenses,
      // @ts-ignore
      repository: value.repository,
      // @ts-ignore
      publisher: value.publisher,
      // @ts-ignore
      email: value.email,
      // @ts-ignore
      url: value.url,
    }));
    setLicenses(formattedData);
  }, []);

  return (
    <Box>
      <Typography variant='h5' sx={{m: 2}}>ライセンス情報</Typography>
      <Typography variant='body1' sx={{m: 2}}>
        EchoNorの開発にはオープンソースソフトウェアを使用しています。
      </Typography>

      <div>
        <ul>
          <li><Link href="https://opensource.org/licenses/MIT" target="_blank">MIT License</Link></li>
          <li><Link href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2.0</Link></li>
          <li><Link href="https://opensource.org/licenses/ISC" target="_blank">ISC License</Link></li>
          <li><Link href="https://opensource.org/licenses/BSD-2-Clause" target="_blank">BSD 2-Clause License</Link></li>
          <li><Link href="https://opensource.org/licenses/BSD-3-Clause" target="_blank">BSD 3-Clause License</Link></li>
          <li><Link href="https://opensource.org/licenses/Python-2.0" target="_blank">Python License 2.0</Link></li>
          <li><Link href="https://www.mozilla.org/en-US/MPL/2.0/" target="_blank">Mozilla Public License 2.0</Link></li>
        </ul>
      </div>
      <ul>
        {licenses.map((license, index) => (
          <li key={index}>
            <p><strong>{license.name}</strong></p>
            <p>License: {license.licenses}</p>
            <p>Repository: <Link href={license.repository} target="_blank" rel="noopener noreferrer">{license.repository}</Link></p>
            <p>Publisher: {license.publisher}</p>
            <p>E-Mail: {license.email}</p>
            {/* @ts-ignore */}
            <p>Web Site: <a href={license.url} target="_blank" rel="noopener noreferrer">{license.url}</a></p>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default LicenseInfo;
