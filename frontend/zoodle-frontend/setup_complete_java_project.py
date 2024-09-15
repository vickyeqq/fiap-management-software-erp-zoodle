import os

def create_directory(path):
    os.makedirs(path, exist_ok=True)

def create_file(path, content):
    with open(path, 'w') as f:
        f.write(content)

def setup_project(base_path):
    java_path = os.path.join(base_path, 'java-backend')
    
    # Create main directory structure
    create_directory(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'model'))
    create_directory(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'dao'))
    create_directory(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'service'))
    create_directory(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'controller'))
    create_directory(os.path.join(java_path, 'src', 'main', 'resources'))
    create_directory(os.path.join(java_path, 'src', 'test', 'java', 'com', 'eskina', 'service'))

    # Create database.properties
    create_file(os.path.join(java_path, 'src', 'main', 'resources', 'database.properties'),
                'db.url=jdbc:oracle:thin:@localhost:1521/XE\n'
                'db.user=seu_usuario\n'
                'db.password=sua_senha\n'
                'db.driver=oracle.jdbc.OracleDriver')

    # Create DAO.java
    create_file(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'dao', 'DAO.java'),
                '''package com.eskina.dao;

import java.sql.SQLException;
import java.util.List;

public interface DAO<T> {
    T create(T t) throws SQLException;
    T read(long id) throws SQLException;
    T update(T t) throws SQLException;
    void delete(long id) throws SQLException;
    List<T> list() throws SQLException;
}''')

    # Create Product.java
    create_file(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'model', 'Product.java'),
                '''package com.eskina.model;

public class Product {
    private long id;
    private String name;
    private String type;
    private int quantity;
    private float price;

    public Product(long id, String name, String type, int quantity, float price) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
    }

    // Getters and setters
    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public float getPrice() { return price; }
    public void setPrice(float price) { this.price = price; }
}''')

    # Create ProductDAO.java
    create_file(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'dao', 'ProductDAO.java'),
                '''package com.eskina.dao;

import com.eskina.model.Product;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO implements DAO<Product> {
    private Connection connection;

    public ProductDAO(Connection connection) {
        this.connection = connection;
    }

    @Override
    public Product create(Product product) throws SQLException {
        String sql = "INSERT INTO products (name, type, quantity, price) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, product.getName());
            pstmt.setString(2, product.getType());
            pstmt.setInt(3, product.getQuantity());
            pstmt.setFloat(4, product.getPrice());
            int affectedRows = pstmt.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating product failed, no rows affected.");
            }

            try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    product.setId(generatedKeys.getLong(1));
                } else {
                    throw new SQLException("Creating product failed, no ID obtained.");
                }
            }
        }
        return product;
    }

    @Override
    public Product read(long id) throws SQLException {
        String sql = "SELECT * FROM products WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setLong(1, id);
            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    return new Product(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("type"),
                        rs.getInt("quantity"),
                        rs.getFloat("price")
                    );
                }
            }
        }
        return null;
    }

    @Override
    public Product update(Product product) throws SQLException {
        String sql = "UPDATE products SET name = ?, type = ?, quantity = ?, price = ? WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setString(1, product.getName());
            pstmt.setString(2, product.getType());
            pstmt.setInt(3, product.getQuantity());
            pstmt.setFloat(4, product.getPrice());
            pstmt.setLong(5, product.getId());
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Updating product failed, no rows affected.");
            }
        }
        return product;
    }

    @Override
    public void delete(long id) throws SQLException {
        String sql = "DELETE FROM products WHERE id = ?";
        try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
            pstmt.setLong(1, id);
            int affectedRows = pstmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Deleting product failed, no rows affected.");
            }
        }
    }

    @Override
    public List<Product> list() throws SQLException {
        List<Product> products = new ArrayList<>();
        String sql = "SELECT * FROM products";
        try (Statement stmt = connection.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                products.add(new Product(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getString("type"),
                    rs.getInt("quantity"),
                    rs.getFloat("price")
                ));
            }
        }
        return products;
    }
}''')

    # Create ProductService.java
    create_file(os.path.join(java_path, 'src', 'main', 'java', 'com', 'eskina', 'service', 'ProductService.java'),
                '''package com.eskina.service;

import com.eskina.dao.ProductDAO;
import com.eskina.model.Product;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class ProductService {
    private ProductDAO productDAO;

    public ProductService(Connection connection) {
        this.productDAO = new ProductDAO(connection);
    }

    public Product createProduct(Product product) throws SQLException {
        return productDAO.create(product);
    }

    public Product getProduct(long id) throws SQLException {
        return productDAO.read(id);
    }

    public Product updateProduct(Product product) throws SQLException {
        return productDAO.update(product);
    }

    public void deleteProduct(long id) throws SQLException {
        productDAO.delete(id);
    }

    public List<Product> listProducts() throws SQLException {
        return productDAO.list();
    }
}''')

    # Create ProductServiceTest.java
    create_file(os.path.join(java_path, 'src', 'test', 'java', 'com', 'eskina', 'service', 'ProductServiceTest.java'),
                '''package com.eskina.service;

import com.eskina.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private Connection mockConnection;

    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        productService = new ProductService(mockConnection);
    }

    @Test
    void testCreateProduct() throws SQLException {
        Product product = new Product(1L, "Test Product", "Test Type", 10, 9.99f);
        Product createdProduct = productService.createProduct(product);
        assertNotNull(createdProduct);
        assertEquals(product.getName(), createdProduct.getName());
    }

    @Test
    void testGetProduct() throws SQLException {
        long productId = 1L;
        Product product = productService.getProduct(productId);
        assertNotNull(product);
        assertEquals(productId, product.getId());
    }

    @Test
    void testUpdateProduct() throws SQLException {
        Product product = new Product(1L, "Updated Product", "Updated Type", 20, 19.99f);
        Product updatedProduct = productService.updateProduct(product);
        assertNotNull(updatedProduct);
        assertEquals(product.getName(), updatedProduct.getName());
    }

    @Test
    void testDeleteProduct() throws SQLException {
        long productId = 1L;
        assertDoesNotThrow(() -> productService.deleteProduct(productId));
    }

    @Test
    void testListProducts() throws SQLException {
        List<Product> products = productService.listProducts();
        assertNotNull(products);
        assertFalse(products.isEmpty());
    }
}''')

    # Create pom.xml
    create_file(os.path.join(java_path, 'pom.xml'),
                '''<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.eskina</groupId>
    <artifactId>eskina-backend</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>11</maven.compiler.source>
        <maven.compiler.target>11</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Oracle JDBC Driver -->
        <dependency>
            <groupId>com.oracle.database.jdbc</groupId>
            <artifactId>ojdbc8</artifactId>
            <version>19.8.0.0</version>
        </dependency>

        <!-- JUnit 5 -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.7.0</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.7.0</version>
            <scope>test</scope>
        </dependency>

        <!-- Mockito -->
        <dependency>
            <groupId>org.mockito</groupId>
            <artifactId>mockito-core</artifactId>
            <version>3.6.28</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.22.2</version>
            </plugin>
        </plugins>
    </build>
</project>''')

    print(f"Project structure and files created at {java_path}")

if __name__ == "__main__":
    base_path = r"C:\Users\Lana\Documents\GitHub\fiap-management-software-b2b\react-version"
    setup_project(base_path)